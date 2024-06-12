import "./App.scss";

import { useEffect, useState } from "react";

import CreateForm from "./Component/CreateForm";
import Header from "./Component/Header";
import SentEmailList from "./Component/SentEmailList";
import SentEmailModel from "./Component/SentEmailModel";

const App = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [nonprofits, setNonprofits] = useState([]);
  const [foundations, setFoundations] = useState([]);
  const [emailsSent, setEmailsSent] = useState([]);

  const fetchFoundations = async () => {
    const response = await fetch("http://localhost:6969/foundations");
    const data = await response.json();
    setFoundations(data);
  };

  const fetchNonprofits = async () => {
    const response = await fetch("http://localhost:6969/nonprofits");
    const data = await response.json();
    setNonprofits(data);
  };

  const fetchEmailsSent = async () => {
    const response = await fetch("http://localhost:6969/emails-sent");
    const data = await response.json();
    setEmailsSent(data);
    fetchFoundations();
    fetchNonprofits();
  };

  useEffect(() => {
    fetchEmailsSent();
  }, []);

  return (
    <div className="appWrapper">
      <Header
        setOpenForm={setOpenForm}
        setOpenModel={setOpenModel}
        emailsSent={emailsSent}
      />
      <SentEmailList
        emailsSent={emailsSent}
        foundationsLength={foundations?.length}
        nonprofitsLength={nonprofits?.length}
        setOpenForm={setOpenForm}
        setOpenModel={setOpenModel}
      />
      <CreateForm
        open={openForm}
        setOpen={setOpenForm}
        setNonprofits={setNonprofits}
        setFoundations={setFoundations}
      />
      <SentEmailModel
        open={openModel}
        setOpenModel={setOpenModel}
        foundations={foundations}
        nonprofits={nonprofits}
        fetchEmailsSent={fetchEmailsSent}
      />
    </div>
  );
};

export default App;
