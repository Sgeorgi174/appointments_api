export const rightText = (command) => {
  switch (command) {
    case "address":
      return `Наример:

Адрес: 
Ленина 78 (вход со двора)

Телефон: 
+7 999 999 9999

Instagram: 
www.instagram.com/vash-instagram`;
    case "start":
      return "Это сообщение будут видеть люди при запуске ввашего бота";
    case "notification":
      return `Пример использование конструкции -время-:

"Напоминаю, что у вас завтра запись на -время-, пожалуйста не опаздывайте"


"Напоминаю, что у вас завтра запись на 16:00, пожалуйста не опаздывайте"`;
    default:
      return;
  }
};
