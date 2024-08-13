import Form from '../../UI/Form.jsx';

const initialModule = {
  ModuleName: 'Deleteable Module',
  ModuleCode: 'XYZ',
  ModuleLevel: 3,
  ModuleYearID: null,
  ModuleLeaderID: null,
  ModuleImageURL:
    'https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg',
};

function ModuleForm({ onSubmit, onCancel, dropdowns }) {
  // Initialisation ------------------------------
  const conformance = {
    html2js: {
      ModuleName: (value) => (value === '' ? null : value),
      ModuleCode: (value) => (value === '' ? null : value),
      ModuleLevel: (value) => parseInt(value),
      ModuleYearID: (value) => (value == 0 ? null : parseInt(value)),
      ModuleLeaderID: (value) => (value == 0 ? null : parseInt(value)),
      ModuleImageURL: (value) => (value === '' ? null : value),
    },
    js2html: {
      ModuleName: (value) => (value === null ? '' : value),
      ModuleCode: (value) => (value === null ? '' : value),
      ModuleLevel: (value) => value,
      ModuleYearID: (value) => (value === null ? 0 : value),
      ModuleLeaderID: (value) => (value === null ? 0 : value),
      ModuleImageURL: (value) => (value === null ? '' : value),
    },
  };

  const validation = {
    isValid: {
      ModuleName: (name) => name && name.length > 8,
      ModuleCode: (code) => /^\D{2}\d{4}$/.test(code),
      ModuleLevel: (level) => level > 2 && level < 8,
      ModuleYearID: (id) => id > 0,
      ModuleLeaderID: (id) => id === null || id > 0,
      ModuleImageURL: (url) =>
        /^(http|https):\/\/(([a-zA-Z0-9$\-_.+!*'(),;:&=]|%[0-9a-fA-F]{2})+@)?(((25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9][0-9]|[1-9][0-9]|[0-9])){3})|localhost|([a-zA-Z0-9\-\u00C0-\u017F]+\.)+([a-zA-Z]{2,}))(:[0-9]+)?(\/(([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*(\/([a-zA-Z0-9$\-_.+!*'(),;:@&=]|%[0-9a-fA-F]{2})*)*)?(\?([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?(#([a-zA-Z0-9$\-_.+!*'(),;:@&=/?]|%[0-9a-fA-F]{2})*)?)?$/.test(
          url
        ),
    },
    errorMessage: {
      ModuleName: 'Module name is too short',
      ModuleCode: 'Module code is not in a valid format',
      ModuleLevel: 'Invalid module level',
      ModuleYearID: 'No delivery year has been selected',
      ModuleLeaderID: 'Invalid module leader selected',
      ModuleImageURL: 'The URL entered is not a valid URL string',
    },
  };

  // State ---------------------------------------
  const [module, errors, handleChange, handleSubmit] = Form.useForm(
    initialModule,
    conformance,
    validation,
    onSubmit
  );

  // Handlers ------------------------------------
  // View ----------------------------------------
  const years = dropdowns.years;
  const staff = dropdowns.staff;
  return (
    <Form onSubmit={handleSubmit} onCancel={onCancel}>
      <Form.Item label='Module Name' error={errors.ModuleName}>
        <input
          type='text'
          name='ModuleName'
          value={conformance.js2html['ModuleName'](module.ModuleName)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label='Module Code' error={errors.ModuleCode}>
        <input
          type='text'
          name='ModuleCode'
          value={conformance.js2html['ModuleCode'](module.ModuleCode)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item label='Module Level' error={errors.ModuleLevel}>
        <select
          name='ModuleLevel'
          value={conformance.js2html['ModuleLevel'](module.ModuleLevel)}
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

      <Form.Item label='Module Year' error={errors.ModuleYearID}>
        {!years.list ? (
          <p>{years.loadingMessage}</p>
        ) : (
          <select
            name='ModuleYearID'
            value={conformance.js2html['ModuleYearID'](module.ModuleYearID)}
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

      <Form.Item label='Module Leader' error={errors.ModuleLeaderID}>
        {!staff.list ? (
          <p>{staff.loadingMessage}</p>
        ) : (
          <select
            name='ModuleLeaderID'
            value={conformance.js2html['ModuleLeaderID'](module.ModuleLeaderID)}
            onChange={handleChange}
          >
            <option value='0'>None selected</option>
            {staff.list.map((member) => (
              <option key={member.UserID} value={member.UserID}>
                {`${member.UserFirstname} ${member.UserLastname}`}
              </option>
            ))}
          </select>
        )}
      </Form.Item>

      <Form.Item label='Module Image' error={errors.ModuleImageURL}>
        <input
          type='text'
          name='ModuleImageURL'
          value={conformance.js2html['ModuleImageURL'](module.ModuleImageURL)}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}

export default ModuleForm;
