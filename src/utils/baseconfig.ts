const PROTOCAL = 'https';
const PROJECT_NAME = '';
const SERVICE_NAME = '';
const DOMAIN = '';

function getURL() {
  const config: any = {
    localhost: '/api',
    '127.0.0.1': '/api',
  };
  const envs = ['dev', 'test', 'ptest', 'testone', 'testtwo', 'ontest', 'prod'];
  envs.map((env: string) => {
    const projectUrl = `${PROJECT_NAME}.${env}.${DOMAIN}`;
    config[projectUrl] = `${PROTOCAL}://${SERVICE_NAME}.${env}.${DOMAIN}`;
    return 0;
  });

  const domain = new URL(window.location.href).hostname;
  return config[domain] || '';
}

export default { baseUrl: getURL() };
