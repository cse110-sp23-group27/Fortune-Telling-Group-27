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
      '--ignore-certificate-errors',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu'
    ]
  },
  server: baseOptions.server
}
module.exports = ci ? ciPipelineOptions : baseOptions;