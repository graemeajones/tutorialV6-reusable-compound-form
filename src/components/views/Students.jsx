import useLoad from '../api/useLoad.js';
import { useModal, Modal } from '../UI/Modal.jsx';
import Action from '../UI/Actions.jsx';
import UserForm from '../entity/user/UserForm.jsx';
import { CardContainer } from '../UI/Card.jsx';
import UserCard from '../entity/user/UserCard';

function Students() {
  // Initialisation ------------------------------
  const loggedInUserGroup = 13;
  const myGroupEndpoint = `/users/groups/${loggedInUserGroup}`;
  const yearsEndpoint = `/years`;
  const usertypesEndpoint = '/usertypes';

  // State ---------------------------------------
  const [students, setStudents, loadingMessage] = useLoad(myGroupEndpoint);
  const [years, , loadingYearsMessage] = useLoad(yearsEndpoint);
  const [usertypes, , loadingUsertypesMessage] = useLoad(usertypesEndpoint);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);

  // Handlers ------------------------------------
  const handleSubmit = (user) => {
    user.UserID = Math.floor(10000 * Math.random());
    setStudents([...students, user]);
    closeForm();
    console.log(JSON.stringify(user));
  };

  // View ----------------------------------------
  const addNewUser = 'Add new user';
  const dropdowns = {
    years: {
      list: years,
      loadingMessage: loadingYearsMessage,
    },
    usertypes: {
      list: usertypes,
      loadingMessage: loadingUsertypesMessage,
    },
  };
  return (
    <>
      <h1>Students</h1>

      <Modal show={showForm} title={formTitle}>
        <UserForm onSubmit={handleSubmit} onCancel={closeForm} dropdowns={dropdowns} />
      </Modal>

      <Action.Tray>
        <Action.Add showText buttonText={addNewUser} onClick={() => openForm(addNewUser)} />
      </Action.Tray>

      <CardContainer>
        {!students ? (
          <p>{loadingMessage}</p>
        ) : students.length === 0 ? (
          <p>No records found.</p>
        ) : (
          students.map((student) => <UserCard user={student} key={student.UserID} />)
        )}
      </CardContainer>
    </>
  );
}

export default Students;
