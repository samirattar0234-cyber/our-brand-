import { SignInPage } from "@/components/ui/sign-in";

export default function App() {
  return (
    <SignInPage
      title={
        <>
          Welcome <span className="brand-word">back.</span>
        </>
      }
      description="Sign in to explore your saved styles and find something that feels like you."
      heroImageSrc="../images/catalog/women-floral-midi-dress.jpg"
    />
  );
}
