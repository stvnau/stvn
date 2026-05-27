export async function GET() {
  return Response.json({
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    hasGnewsKey: !!process.env.GNEWS_API_KEY,
    anthropicKeyPrefix: process.env.ANTHROPIC_API_KEY?.slice(0, 6) ?? "NOT SET",
    gnewsKeyLength: process.env.GNEWS_API_KEY?.length ?? 0,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    allEnvKeys: Object.keys(process.env).sort(),
  });
}
