export const messages = {
  info: "🙂🙂🙂 File Upload is cancelled",
  success: "🚀🚀🚀🚀 😍 uploaded successfully",
};

export const checkIsLinkValid = (time: number) =>
  Date.now() - time < 12 * 60 * 60 * 1000;
