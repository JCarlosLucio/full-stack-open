import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const isInPhonebook = persons.some((person) => person.name === newName);

    if (isInPhonebook) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      const result = window.confirm(message);
      if (result) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };

        personService
          .update(personToUpdate.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map(
                (person) => (person.name !== newName ? person : returnedPerson)
              )
            );
            setMessage({
              text: `Updated ${returnedPerson.name}`,
              type: 'success',
            });
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            console.log(error.response.data.error);
            setMessage({
              text: `${error.response.data.error}`,
              type: 'fail',
            });
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'success' });
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setMessage({
            text: `${error.response.data.error}`,
            type: 'fail',
          });
        });
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const deletePerson = (id, name) => {
    const result = window.confirm(`Delete ${name}?`);

    if (result) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage({ text: `Deleted ${name}`, type: 'success' });
        })
        .catch((error) => {
          setMessage({
            text: `${newName} has already been removed from server`,
            type: 'fail',
          });
          setPersons(persons.filter((person) => person.id !== id));
        });
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
