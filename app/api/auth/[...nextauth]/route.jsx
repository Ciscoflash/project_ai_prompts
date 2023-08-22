import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      // this is to know the user online
      // chnage the user id
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if a user already exists
        const isExist = await User.findOne({ email: profile.email });
        if (isExist) {
          console.log("User already exists");
        }
        // if not create a new user
        if (!isExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(), // this is to make sure there is no space,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error checking if user already exist", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
