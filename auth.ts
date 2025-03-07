import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GOOGLE_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({
      user: { name, email, image},
      profile
    }) {
    
      if (!profile) return false; // Profilin undefined olması durumuna karşı koruma

      const id = profile.sub;
      const login = profile.login || ""; // Eğer 'login' gelmiyorsa varsayılan bir değer ata
      
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({ // if the user not exist create a new author
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          
        });
      }
      return true;
    },
    //after succesful signin 
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const googleId = profile.sub;
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, {
            id: googleId
          });
      
        token.id = user?._id ?? googleId;
      }

      return token;
    },
    // this is allows us to connect a spesific google user with a sanity author
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
})

// these func will be executed after succesful authentication by nextauth
