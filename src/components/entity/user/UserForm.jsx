import Form from '../../UI/Form.jsx';

const initialUser = {
  UserFirstname: null,
  UserLastname: null,
  UserEmail: null,
  UserRegistered: 0,
  UserLevel: 0,
  UserYearID: null,
  UserUsertypeID: null,
  UserImageURL:
    'https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg',
};

function UserForm({ onSubmit, onCancel, dropdowns }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      UserFirstname: (value) => (value === '' ? null : value),
      UserLastname: (value) => (value === '' ? null : value),
      UserEmail: (value) => (value === '' ? null : value),
      UserRegistered: (value) => value === 'true',
      UserLevel: (value) => parseInt(value),
      UserYearID: (value) => (value == 0 ? null : parseInt(value)),
      UserUsertypeID: (value) => (value == 0 ? null : parseInt(value)),
      UserImageURL: (value) => (value === '' ? null : value),
    },
    js2html: {
      UserFirstname: (value) => (value === null ? '' : value),
      UserLastname: (value) => (value === null ? '' : value),
      UserEmail: (value) => (value === null ? '' : value),
      UserRegistered: (value) => value,
      UserLevel: (value) => value,
      UserYearID: (value) => (value === null ? 0 : value),
      UserUsertypeID: (value) => (value === null ? 0 : value),
      UserImageURL: (value) => (value === null ? '' : value),
    },
  };

  const validation = {
    isValid: {
      UserFirstname: (name) => name && name.length > 1,
      UserLastname: (name) => name && name.length > 1,
      UserEmail: (email) =>
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          email
        ),
      UserRegistered: (status) => status === true || status === false,
      UserLevel: (level) => level > 2 && level < 8,
      UserYearID: (id) => id === null || id > 0,
      UserUsertypeID: (id) => id > 0,
      UserImageURL: (url) =>
        /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(
          url
        ),
    },
    errorMessage: {
      UserFirstname: 'There must be at least one character in a name',
      UserLastname: 'There must be at least one character in a name',
      UserEmail: 'Invalid email format',
      UserRegistered: 'Registration status must be true or false',
      UserLevel: 'Must be in the range 3 to 7 inclusive',
      UserYearID: 'Invalid delivery year has been selected',
      UserUsertypeID: 'Invalid user type selected',
      UserImageURL: 'The URL entered is not a valid URL string',
    },
  };

  // State ---------------------------------------
  const [user, errors, handleChange, handleSubmit] = Form.useForm(
    initialUser,
    conformance,
    validation,
    onSubmit
  );

  // Handlers ------------------------------------
  // View ----------------------------------------
  const years = dropdowns.years;
  const usertypes = dropdowns.usertypes;

  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item label='First name' error={errors.UserFirstname}>
        <input
          type='text'
          name='UserFirstname'
          value={conformance.js2html['UserFirstname'](user.UserFirstname)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label='Last name' error={errors.UserLastname}>
        <input
          type='text'
          name='UserLastname'
          value={conformance.js2html['UserLastname'](user.UserLastname)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label='Email address' error={errors.UserEmail}>
        <input
          type='text'
          name='UserEmail'
          value={conformance.js2html['UserEmail'](user.UserEmail)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label='User register?' error={errors.UserRegistered}>
        <div className='FormRadioGroup'>
          <div className='FormRadioOption'>
            <input
              type='radio'
              name='UserRegistered'
              value={true}
              checked={conformance.js2html['UserRegistered'](user.UserRegistered)}
              onChange={handleChange}
            />
            Yes
          </div>
          <div className='FormRadioOption'>
            <input
              type='radio'
              name='UserRegistered'
              value={false}
              checked={!conformance.js2html['UserRegistered'](user.UserRegistered)}
              onChange={handleChange}
            />
            No
          </div>
        </div>
      </Form.Item>

      <Form.Item label='Student level' error={errors.UserLevel}>
        <select
          name='UserLevel'
          value={conformance.js2html['UserLevel'](user.UserLevel)}
          onChange={handleChange}
        >
          <option value='0' disabled>
            None selected
          </option>
          {[3, 4, 5, 6, 7].map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </Form.Item>

      <Form.Item label='User year' error={errors.UserYearID}>
        {!years.list ? (
          <p>{years.loadingMessage}</p>
        ) : (
          <select
            name='UserYearID'
            value={conformance.js2html['UserYearID'](user.UserYearID)}
            onChange={handleChange}
          >
            <option value='0'>None selected</option>
            {years.list.map((year) => (
              <option key={year.YearID} value={year.YearID}>
                {year.YearName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item label='User type' error={errors.UserUsertypeID}>
        {!usertypes.list ? (
          <p>{usertypes.loadingMessage}</p>
        ) : (
          <select
            name='UserUsertypeID'
            value={conformance.js2html['UserUsertypeID'](user.UserUsertypeID)}
            onChange={handleChange}
          >
            <option value='0'>None selected</option>
            {usertypes.list.map((type) => (
              <option key={type.UsertypeID} value={type.UsertypeID}>
                {type.UsertypeName}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item label='Image URL' error={errors.UserImageURL}>
        <input
          type='text'
          name='UserImageURL'
          value={conformance.js2html['UserImageURL'](user.UserImageURL)}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}

export default UserForm;
