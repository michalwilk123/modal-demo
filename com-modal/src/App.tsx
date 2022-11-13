import { useState } from "react";
import "./App.css";
import { Modal } from "./components/Modal";
import { ModalData } from "./components/Modal/Modal.types";

function App() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleSendFormData = (dat: ModalData) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dat),
    })
      .then((r) => {
        console.log(r);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="App">
      <h2>
        Modal demo
      </h2>
      <h3>
        <a href="">Link</a>
      </h3>
      {modalOpen && (
        <Modal
          onSubmitClick={handleSendFormData}
          onCancelClick={() => setModalOpen(false)}
        />
      )}
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
    </div>
  );
}

export default App;
