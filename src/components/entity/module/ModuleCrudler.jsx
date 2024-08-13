import useLoad from '../../api/useLoad.js';
import { useModal, Modal } from '../../UI/Modal.jsx';
import API from '../../api/API.js';
import { Alert, Error } from '../../UI/Notifications.jsx';
import Action from '../../UI/Actions.jsx';
import ModuleForm from './ModuleForm.jsx';
import { CardContainer } from '../../UI/Card.jsx';
import ModuleCard from './ModuleCard.jsx';

function ModuleCrudler({ endpoint }) {
  // Initialisation ------------------------------
  const yearsEndpoint = `/years`;
  const staffEndpoint = `/users/staff`;
  const postModuleEndpoint = `/modules`;

  // State ---------------------------------------
  const [modules, , loadingMessage, loadModules] = useLoad(endpoint);
  const [years, , loadingYearsMessage] = useLoad(yearsEndpoint);
  const [staff, , loadingStaffMessage] = useLoad(staffEndpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showError, errorContent, openError, closeError] = useModal(false);

  // Handlers ------------------------------------
  const handleSubmit = async (module) => {
    const result = await API.post(postModuleEndpoint, module);
    if (result.isSuccess) {
      closeForm();
      openAlert('Module successfully added');
      await loadModules(endpoint);
    } else openError(result.message);
  };

  // View ----------------------------------------
  const addNewModule = 'Add new module';
  const dropdowns = {
    years: {
      list: years,
      loadingMessage: loadingYearsMessage,
    },
    staff: {
      list: staff,
      loadingMessage: loadingStaffMessage,
    },
  };
  return (
    <>
      <Modal show={showForm} title={formTitle}>
        <ModuleForm onSubmit={handleSubmit} onCancel={closeForm} dropdowns={dropdowns} />
      </Modal>

      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Error show={showError} message={errorContent} onDismiss={closeError} />

      <Action.Tray>
        <Action.Add showText buttonText={addNewModule} onClick={() => openForm(addNewModule)} />
      </Action.Tray>

      {!modules ? (
        <p>{loadingMessage}</p>
      ) : modules.length === 0 ? (
        <p>No records found ...</p>
      ) : (
        <CardContainer>
          {modules.map((module) => (
            <ModuleCard module={module} key={module.ModuleID} />
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default ModuleCrudler;
