import React, { Suspense } from "react";
import Game from "../game";
import { URLEncryptor } from "@/lib/urlObfuscator";
import { isValidUrl } from "@/helpers/validation";
import LoadingScreen from "@/components/loading-screen";
import { fetchConfig } from "../utils";

// force dynamic page (page is never cached)
export const dynamic = "force-dynamic";
// fetched data is never cached
export const fetchCache = "force-no-store";

const ErrorScreen = ({ error }: { error: { error: boolean; message: string } }) => (
  <div className="text-white flex flex-col items-center justify-center h-screen">
    <div className="text-center">
      <h1 className="text-4xl font-bold">Error</h1>
      <p className="text-lg">{error.message}</p>
    </div>
  </div>
);

const GamePage = async ({ params }: { params: { slug: string } }) => {
  const urlObfuscatorSecret = process.env.ENCRYPTION_SECRET ?? "";
  if (!urlObfuscatorSecret) {
    throw new Error("No encryption secret provided");
  }

  const decryptedSlug = new URLEncryptor(urlObfuscatorSecret).decrypt(params.slug);
  
  if (decryptedSlug instanceof Error || !isValidUrl(decryptedSlug)) {
    throw new Error(decryptedSlug instanceof Error ? 
                    decryptedSlug.message : 
                    "Invalid URL");
  }
  
  const gameConfig = await fetchConfig(decryptedSlug + "/config");

  console.dir({decryptedSlug, gameConfig}, {depth: 4})

  if (gameConfig instanceof Error) {
    return <ErrorScreen error={{ error: true, message: gameConfig.message }} />;
  }

  if (!gameConfig?.websocket_url) {
    return <ErrorScreen error={{ error: true, message: "No websocket url found for server" }} />;
  }

  return <Game gameConfig={gameConfig} />;
};

const Page = (props: { params: { slug: string } }) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <GamePage {...props} />
    </Suspense> 
  );
};

export default Page;