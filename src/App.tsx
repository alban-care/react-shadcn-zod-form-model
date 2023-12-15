import FormLayout from "./components/FormLayout";

function App() {
  const formFields = [
    {
      fieldName: "email",
      options: {
        label: "Email",
        placeholder: "Email",
        descritpionMessage: "We'll never share your email with anyone else.",
        infoMessage: "We'll never share your email with anyone else.",
        type: "email",
        required: true,
      },
    },
  ];

  return (
    <div className="container mt-8">
      <FormLayout fields={formFields} />
    </div>
  );
}

export default App;
