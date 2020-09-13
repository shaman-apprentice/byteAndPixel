const path = require('path');
const Client = require('ssh2-sftp-client');
const sftp = new Client();

const remoteTargetDir = '/byteAndPixel';

(async () => {
  try {
    await sftp.connect({
      host: process.env.hostname,
      port: '22',
      username: process.env.hostuser,
      password: process.env.hostpw
    });
    
    await sftp.rmdir(remoteTargetDir, true);
    await uploadFiles(sftp);
  } catch (error) { // "Unhandled promise rejections" do still exit the process with `0` in node 12. Therefore force exit here with `!= 0` 
    try {
      sftp.end();
    } catch (sftpEndError) {
      console.error('Error closing sftp client:', sftpEndError);
    }

    console.error(error);
    process.exit(1);
  } finally {
    sftp.end();
  }
})();

async function uploadFiles(sftp) {
  await sftp.mkdir(remoteTargetDir);
  await Promise.all([
    sftp.uploadDir(path.join(__dirname, '../', 'Assets'), remoteTargetDir + '/Assets'),
    sftp.uploadDir(path.join(__dirname, '../', 'dist'), remoteTargetDir + '/dist'),
    sftp.fastPut(path.join(__dirname, '../', 'index.html'), remoteTargetDir + '/index.html'),
  ]);
}