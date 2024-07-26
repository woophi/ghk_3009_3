declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
export const sendDataToGA = async (choice: string) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycby5qMQb_xglJuAA9IlAOzgInjXlrr3NUNzu4kf0Niju7Ia6ejxejxe5M6xc7xL87C0hbg/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, choice, variant: '3009_3' }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
