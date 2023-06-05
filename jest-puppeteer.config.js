const ci = Boolean(process.env.CI || false);

const baseOptions = {
  server: {
    command: 'npm run starting-server',
    port: 5500
  }
}

const ciPipelineOptions = {
  launch: {
    headless: true,
    args: [
      '--disable-gpu'
    ]
  },
  server: baseOptions.server
}
module.exports = ci ? ciPipelineOptions : baseOptions;