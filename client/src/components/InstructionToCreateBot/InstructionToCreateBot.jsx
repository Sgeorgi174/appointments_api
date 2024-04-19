import styles from "./InstructionToCreateBot.module.css";

const instructionsList = [
  {
    text: "Откройте Telegram и найдите бота <span>@BotFather</span>.",
    imgUrl: "/img/instruction/step_1.jpg",
  },
  {
    text: "Напишите ему <span>/newbot</span> и следуйте инструкциям для создания нового бота.",
    imgUrl: "/img/instruction/step_2.jpg",
  },
  {
    text: "<span>@BotFather</span> предложит вам ввести <span>имя</span> вашего бота (это <span>имя</span> будет отображаться в списке контактов).",
    imgUrl: "/img/instruction/step_3.jpg",
  },
  {
    text: '<span>@BotFather</span> предложит вам ввести уникальную <span>ссылку</span> для вашего бота, которая должна заканчиваться на <span>"bot"</span> (пример: <span>"example_bot"</span>)',
    imgUrl: "/img/instruction/step_4.jpg",
  },
  {
    text: "После успешного создания бота <span>@BotFather</span> выдаст вам <span>token</span>. Это — ключ, который вы будете использовать для создания вашего бота.",
    imgUrl: "/img/instruction/step_5.jpg",
  },
  {
    text: "Сохраните <span>токен</span>, полученный от <span>@BotFather</span>. Он будет необходим для создания бота.",
    imgUrl: "",
  },
];

export const InstructionToCreateBot = ({
  isCheckboxChecked,
  handleCheckboxChange,
}) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Инструкция по созданию бота для <span>Telegram</span>
      </h2>
      <div className={styles.instructionsBox}>
        {instructionsList.map((el, index) => {
          return (
            <div key={index} className={styles.instructionBox}>
              <div className={styles.textRow}>
                <span className={styles.textSpan}>{`${index + 1}.`}</span>
                <p
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: el.text }}
                ></p>
              </div>
              {el.imgUrl ? (
                <img className={styles.img} src={el.imgUrl} alt="" />
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <p className={styles.confirmText}>
        После выполнения этих шагов вы готовы к созданию вашего бота. Не
        забудьте хранить ваш токен в безопасном месте и не делиться им с
        посторонними.
      </p>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          id="readInstructions"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="readInstructions" className={styles.checkboxLabel}>
          {`Я прочитал(-а) инструкцию`}
        </label>
      </div>
    </div>
  );
};
