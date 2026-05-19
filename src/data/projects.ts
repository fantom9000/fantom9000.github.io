export type CaseSection =
  | {
      type: "text";
      title: string;
      body: string;
    }
  | {
      type: "browser";
      title?: string;
      body?: string;
      image: string;
      alt: string;
      height?: number;
    }
  | {
      type: "mobilePair";
      title?: string;
      body?: string;
      images: string[];
      alts: string[];
    }
  | {
      type: "imagePair";
      title?: string;
      body?: string;
      images: string[];
      alts: string[];
    }
  | {
      type: "wideImage";
      title?: string;
      body?: string;
      image: string;
      alt: string;
    }
  | {
      type: "desktopMobile";
      title?: string;
      body?: string;
      desktopImage: string;
      desktopAlt: string;
      mobileImage: string;
      mobileAlt: string;
      desktopHeight?: number;
      mobileHeight?: number;
    };

export type Project = {
  slug: "burosfera" | "quiz" | "mary-trufel" | "peptidy";
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
  previewKind: "image" | "quiz" | "peptidy";
  previewImage?: string;
  hero: string;
  lead: string;
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "burosfera",
    number: "01",
    title: "Биржа Бюро Горбунова",
    shortTitle: "Бюросфера",
    description:
      "Профессиональное сообщество и биржа дизайнеров, редакторов, руководителей и всех причастных к созданию продуктов.",
    href: "/projects/burosfera/",
    previewKind: "image",
    previewImage: "/images/figma/high/previews/burosfera.webp",
    hero:
      "Биржа дизайнеров Бюро Горбунова — платформа для поиска работы и специалистов внутри профессионального сообщества.",
    lead:
      "Платформа была запущена в срок. В первый месяц на бирже появились вакансии от крупных компаний, включая Wildberries, МИФ и Актион.",
    sections: [
      {
        type: "text",
        title: "Контекст",
        body:
          "В Бюро не было единой площадки, где выпускники могли бы находить работу, а компании — быстро находить специалистов. Нужно было собрать это в отдельный продукт с понятной логикой взаимодействия."
      },
      {
        type: "browser",
        image: "/images/projects/burosfera/figma-sections/main-screen.webp",
        alt: "Главный экран платформы Бюросфера",
        height: 954
      },
      {
        type: "text",
        title: "Задача",
        body:
          "Спроектировать платформу с разными ролями пользователей и сценариями публикации вакансий, учитывая условия размещения, ограничения и оплату."
      },
      {
        type: "imagePair",
        images: [
          "/images/projects/burosfera/figma-sections/mobile-list.webp",
          "/images/projects/burosfera/figma-sections/mobile-card.webp"
        ],
        alts: ["Мобильный экран списка специалистов Бюросферы", "Мобильный экран карточки специалиста Бюросферы"]
      },
      {
        type: "text",
        title: "Решение",
        body:
          "Собрал структуру платформы и основные сценарии взаимодействия, чтобы пользователь мог быстро разобраться в сервисе и перейти к нужному действию без лишних шагов."
      },
      {
        type: "browser",
        image: "/images/projects/burosfera/figma-sections/publish-overview.webp",
        alt: "Экран с условиями публикации вакансий в Бюросфере",
        height: 817
      },
      {
        type: "text",
        title: "Публикация вакансий",
        body:
          "Сценарий публикации вакансии — один из самых сложных элементов проекта. Он учитывает разные типы пользователей, варианты размещения и сроки публикации. Важно было сделать процесс понятным и последовательным, несмотря на количество условий."
      },
      {
        type: "browser",
        image: "/images/projects/burosfera/figma-sections/vacancy-form.webp",
        alt: "Форма создания новой вакансии в Бюросфере",
        height: 1234
      },
      {
        type: "text",
        title: "Оплата",
        body:
          "Разработан сценарий оплаты с учётом разных условий размещения. Пользователь видит стоимость и параметры публикации до завершения процесса."
      },
      {
        type: "browser",
        image: "/images/projects/burosfera/figma-sections/payment-summary.webp",
        alt: "Экран выбора условий оплаты публикации вакансии",
        height: 821
      },
      {
        type: "text",
        title: "",
        body:
          "Сценарий оплаты встроен в процесс публикации и завершает его без лишних действий. После подтверждения вакансия готова к размещению."
      },
      {
        type: "browser",
        image: "/images/projects/burosfera/figma-sections/payment-modal.webp",
        alt: "Модальное окно оплаты подписки Бюросферы",
        height: 1310
      },
      {
        type: "text",
        title: "",
        body:
          "После оплаты вакансия автоматически публикуется, и пользователь сразу получает доступ к странице с опубликованной вакансией."
      },
      {
        type: "desktopMobile",
        desktopImage: "/images/projects/burosfera/figma-sections/success-desktop.webp",
        desktopAlt: "Десктопный экран успешной публикации вакансии",
        mobileImage: "/images/projects/burosfera/figma-sections/success-mobile.webp",
        mobileAlt: "Мобильный экран успешной публикации вакансии"
      }
    ]
  },
  {
    slug: "quiz",
    number: "02",
    title: "Квиз SayGames",
    shortTitle: "SayGames",
    description:
      "Мобильный квиз для подбора игр на основе стиля и предпочтений пользователя.",
    href: "/projects/quiz/",
    previewKind: "image",
    previewImage: "/images/figma/high/previews/quiz.webp",
    hero:
      "Квиз для подбора мобильных игр — часть маркетинговой воронки SayGames, которая помогает привлекать пользователей.",
    lead:
      "Квиз работает как простой сценарий привлечения: пользователь проходит короткий путь от первого экрана до установки, не теряя интереса по ходу прохождения.",
    sections: [
      {
        type: "imagePair",
        title: "Контекст",
        body:
          "Квиз использовался как рекламный сценарий: пользователь проходит серию вопросов, получает результат и переходит к подборке игр. Основная задача — удержать внимание и довести пользователя до установки.",
        images: [
          "/images/projects/quiz/figma-sections/context-start-dark.webp",
          "/images/projects/quiz/figma-sections/context-start-light.webp"
        ],
        alts: ["Тёмный стартовый экран квиза SayGames", "Светлый стартовый экран квиза SayGames"]
      },
      {
        type: "wideImage",
        title: "Задача",
        body:
          "Спроектировать сценарий и интерфейс квиза, чтобы пользователь проходил его до конца и переходил к скачиванию игр.",
        image: "/images/projects/quiz/figma-sections/task-flow.webp",
        alt: "Экраны выбора пола, вопроса да или нет и выбора игры в квизе SayGames"
      },
      {
        type: "imagePair",
        title: "Решение",
        body:
          "Собрал линейный сценарий с короткими вопросами и быстрым выбором, чтобы пользователь не терялся и не выпадал из прохождения. Визуальный стиль и темп экранов поддерживают интерес на протяжении всего квиза.",
        images: [
          "/images/projects/quiz/figma-sections/solution-character.webp",
          "/images/projects/quiz/figma-sections/solution-game.webp"
        ],
        alts: ["Экран выбора характеристик в квизе SayGames", "Экран оценки игры в квизе SayGames"]
      },
      {
        type: "wideImage",
        title: "",
        body:
          "В конце квиз определяет тип игрока и формирует подборку игр, позволяя пользователю сразу перейти к их установке.",
        image: "/images/projects/quiz/figma-sections/result-flow.webp",
        alt: "Экраны подбора игры, анализа и результата квиза SayGames"
      }
    ]
  },
  {
    slug: "mary-trufel",
    number: "03",
    title: "Mary Trufel",
    shortTitle: "Mary Trufel",
    description:
      "Страница избранного с персональным подбором платьев на основе предпочтений пользователя.",
    href: "/projects/mary-trufel/",
    previewKind: "image",
    previewImage: "/images/figma/high/previews/mary-trufel.webp",
    hero:
      "Избранное в Mary Trufel — место, где невеста собирает понравившиеся платья, сравнивает их и в итоге выбирает одно.",
    lead: "Все, что нужно для выбора и записи на примерку, собрано в одном месте.",
    sections: [
      {
        type: "text",
        title: "Контекст",
        body:
          "Невеста добавляет платья в избранное и возвращается к ним позже, чтобы спокойно пересмотреть и определиться с выбором."
      },
      {
        type: "browser",
        image: "/images/projects/mary-trufel/figma-sections/context-empty.webp",
        alt: "Страница избранного Mary Trufel",
        height: 1362
      },
      {
        type: "text",
        title: "Задача",
        body:
          "Сделать избранное удобным для сравнения платьев и продолжения подбора без возврата в каталог, чтобы невеста могла пересматривать варианты и определиться с выбором."
      },
      {
        type: "desktopMobile",
        desktopImage: "/images/projects/mary-trufel/figma-sections/task-desktop.webp",
        desktopAlt: "Страница избранного Mary Trufel с сохраненными платьями",
        mobileImage: "/images/projects/mary-trufel/figma-sections/task-mobile.webp",
        mobileAlt: "Мобильная страница избранного Mary Trufel",
        desktopHeight: 964,
        mobileHeight: 481
      },
      {
        type: "text",
        title: "",
        body:
          "Если не хватает вариантов, можно получить подборку на основе сохранённых платьев и продолжить поиск."
      },
      {
        type: "browser",
        image: "/images/projects/mary-trufel/figma-sections/recommendation-desktop.webp",
        alt: "Экран Mary Trufel с персональной подборкой платьев",
        height: 1287
      },
      {
        type: "text",
        title: "",
        body:
          "Внутри избранного появляются небольшие вставки, которые напоминают о примерке и приглашают зарегистрироваться, чтобы получить подборку от Феи."
      },
      {
        type: "desktopMobile",
        desktopImage: "/images/projects/mary-trufel/figma-sections/fairy-desktop.webp",
        desktopAlt: "Страница избранного Mary Trufel со вставкой подбора от Феи",
        mobileImage: "/images/projects/mary-trufel/figma-sections/fairy-mobile.webp",
        mobileAlt: "Мобильная страница избранного Mary Trufel со вставкой подбора от Феи",
        desktopHeight: 954,
        mobileHeight: 481
      },
      {
        type: "imagePair",
        images: [
          "/images/projects/mary-trufel/figma-sections/mobile-tile-1.webp",
          "/images/projects/mary-trufel/figma-sections/mobile-tile-2.webp"
        ],
        alts: [
          "Мобильный экран персональной подборки Mary Trufel",
          "Мобильный экран избранного Mary Trufel"
        ]
      }
    ]
  },
  {
    slug: "peptidy",
    number: "04",
    title: "Peptid.ru",
    shortTitle: "Peptid.ru",
    description:
      "Лендинг регистрации интернет-магазина пептидных препаратов с упрощенным входом в сервис.",
    href: "/projects/peptidy/",
    previewKind: "image",
    previewImage: "/images/figma/high/previews/peptidy.webp",
    hero:
      "Регистрационный лендинг для Peptid.ru последовательно объясняет условия программы и подводит к заполнению формы.",
    lead:
      "Регистрация становится логичным продолжением страницы, а не отдельным действием.",
    sections: [
      {
        type: "text",
        title: "Контекст",
        body:
          "Регистрация дает доступ к программе с бонусами и реферальной системой. Важно было сразу показать пользу и не заставлять разбираться в условиях после регистрации."
      },
      {
        type: "browser",
        image: "/images/projects/peptidy/figma-sections/main-screen.webp",
        alt: "Лендинг программы лояльности Peptid.ru",
        height: 2532
      },
      {
        type: "text",
        title: "Задача",
        body:
          "Показать условия и преимущества программы и встроить регистрацию в структуру страницы, чтобы к ней можно было перейти по ходу просмотра."
      },
      {
        type: "imagePair",
        images: [
          "/images/projects/peptidy/figma-sections/task-mobile-1.webp",
          "/images/projects/peptidy/figma-sections/task-mobile-2.webp"
        ],
        alts: [
          "Мобильный экран лендинга Peptid.ru с началом программы лояльности",
          "Мобильный экран лендинга Peptid.ru с преимуществами программы"
        ]
      },
      {
        type: "text",
        title: "",
        body:
          "Финальные шаги регистрации идут последовательно и не перегружают пользователя, поэтому процесс легко довести до конца."
      },
      {
        type: "wideImage",
        image: "/images/projects/peptidy/figma-sections/registration-flow.webp",
        alt: "Мобильные экраны финальных шагов регистрации Peptid.ru"
      }
    ]
  }
];

export const sideWork = {
  concepts: {
    title: "Законцептил",
    description:
      "Вне работы увлекаюсь концептами. Прокачиваю UI. Исследую визуальные нарративы."
  },
  threeD: {
    title: "Натридешил",
    description:
      "Эксперименты с 3D и учебные работы для интерфейсов и визуальных концепций."
  }
};
