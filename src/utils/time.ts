export const wait = async (time: number = 30) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
}