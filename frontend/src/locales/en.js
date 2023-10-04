export default {
  translation: {
    logo: 'Hexlet Chat',
    modals: {
      headers: {
        add: 'Add Channel',
        remove: 'Delete Channel',
        rename: 'Rename Channel',
      },
      body: {
        confirmation: 'Are you sure?',
        channel_name_label: 'Name',
      },
      buttons: {
        send: 'Send',
        decline: 'Cancel',
        remove: 'Delete',
        rename: 'Rename',
        controle_channel: 'Control Channel',
      },
    },
    chat: {
      channels: 'Channels',
      number_of_messages: '{{count}} msg',
      new_message: 'New message',
    },
    toast_messages: {
      success: 'Success!',
      channel_added: 'Channel created',
      channel_renamed: 'Channel renamed',
      channel_deleted: 'Channel Deleted',
      connection: 'Internet connection was lost',
      server_lost: 'Server is not responding',
      unknown: 'Unknown Error',
    },
    authorization: {
      login: 'Log-In',
      signup: 'Register',
      signup_btn: 'Register',
      logout: 'Log-Out',
    },
    placeholders: {
      username_ph: 'Your nickname',
      username_reg_ph: 'Your name',
      password_ph: 'Password',
      password_сonfirmation_ph: 'Confirm password',
      type_message: 'Enter your message...',
    },
    auth_errors: {
      unauthorized: 'Unknown name and password',
      user_exist: 'User already exists',
    },
    validation_errors: {
      wrong_length: 'Minimum 3 Maximum 20 symbols',
      too_short: 'At least 6 символов',
      passwords_must_match: 'Passwords should match!',
      too_big: 'Too long',
      is_required: 'Required!',
      has_to_be_unique: 'Should be unique',
    },
    nf_page: {
      page_nf: 'Page not found',
      go_to_main_page: {
        text: 'But you can follow',
        link: 'main page',
      },
    },
    loading: 'Please wait...',
  },
};
