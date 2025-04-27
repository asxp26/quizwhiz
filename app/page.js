import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Container, AppBar, Toolbar, Typography, Button} from "@mui/material";
import Head from "next/head";
export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>QuizWhiz</title>
        <meta name="description" content="QuizWhiz! A Flashcard SaaS App" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">QuizWhiz</Typography>
          <SignedOut>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Register</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>
    </Container>
  )
}
