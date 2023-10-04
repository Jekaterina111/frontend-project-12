export default {
  translation: {
    logo: 'Hexlet Chat',
    modals: {
      headers: {
        add: 'Добавить канал',
        remove: 'Удалить канал',
        rename: 'Переименовать канал',
      },
      body: {
        confirmation: 'Уверены?',
        channel_name_label: 'Имя канала',
      },
      buttons: {
        send: 'Отправить',
        decline: 'Отклонить',
        remove: 'Удалить',
        rename: 'Переименовать',
        controle_channel: 'Управление каналом',
      },
    },
    chat: {
      channels: 'Каналы',
      number_of_messages: '{{count}} сообщений',
      new_message: 'Новое сообщение',
    },
    toast_messages: {
      success: 'Успешно!',
      channel_added: 'Канал создан',
      channel_renamed: 'Канал переименован',
      channel_deleted: 'Канал удалён',
      connection: 'Потеряно интернет соединение',
      server_lost: 'Сервер не отвечает',
      unknown: 'Неизвестная ошибка',
    },
    authorization: {
      login: 'Войти',
      signup: 'Регистрация',
      signup_btn: 'Зарегистрироваться',
      logout: 'Выйти',
    },
    placeholders: {
      username_ph: 'Ваш ник',
      username_reg_ph: 'Имя пользователя',
      password_ph: 'Пароль',
      password_сonfirmation_ph: 'Подтвердите пароль',
      type_message: 'Введите сообщение...',
    },
    auth_errors: {
      unauthorized: 'Неверные имя пользователя или пароль',
      user_exist: 'Пользователь с этими данными уже существует',
    },
    validation_errors: {
      wrong_length: 'От 3 до 20 символов',
      too_short: 'Не менее 6 символов',
      passwords_must_match: 'Пароли должны совпадать',
      too_big: 'Длинное поле',
      is_required: 'Обязательное поле',
      has_to_be_unique: 'Должно быть уникальным',
    },
    nf_page: {
      page_nf: 'Страница не найдена',
      go_to_main_page: {
        text: 'Но вы можете перейти',
        link: 'на главную страницу',
      },
    },
    loading: 'Идёт загрузка',
  },
};
