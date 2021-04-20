const emailRegex: RegExp = /^\w+([\.-[^a-zA-Z0-9äõöüÄÕÖÜß]]?\w+)*@\w+([\.-[^a-zA-Z0-9äõöüÄÕÖÜß]]?\w+)*(\.\w{2,3})+$/;

export const validEmail = (userEmail: string) => {
  return emailRegex.test(userEmail);
}