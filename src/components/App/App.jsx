import { Component } from "react";
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import { nanoid } from "nanoid";
import { Container, Section, TitleH1, TitleH2 } from "./App.styled";


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };


  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedСontacts = JSON.parse(contacts);

    if (parsedСontacts) {
      this.setState({ contacts: parsedСontacts });
    }
}

  componentDidUpdate(_, prevState) {
    const currentContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (currentContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(currentContacts));
    }
  }


  addContact = ({ name, number }) => {
    const { contacts } = this.state
    const normalizedFind = name.toLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedFind
    );
    if (findName) {
      return alert(`${name} is already in contacts.`);
    }

    const findNumber = contacts.find(contact => contact.number === number);

    if (findNumber) {
      return alert(`This phone number is already in use.`);
    }

    this.setState(({ contacts }) => ({ contacts: [{ name, number, id: nanoid() }, ...contacts], }));
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getContacts();

    return (
      <Container>
        <Section title="Phonebook">
          <TitleH1>Phonebook</TitleH1>
          <ContactForm onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <TitleH2>Contacts</TitleH2>
          <Filter value={filter} onChange={this.handleFilter} />
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Container>
    )
}

}