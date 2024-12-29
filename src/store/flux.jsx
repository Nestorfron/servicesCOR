
const getState = ({ getStore, getActions, setStore }) => {


  return {
    store: {
      users: null,
      user: null,
      customers: [],
      providers: [],
      engineers: [],
      branches: [],
      tickets: [],
      history_tickets: [],
      invoices: [],
    },
    actions: {
  
      //AUTHETICATION ACTIONS://

      signup: async (userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/signup`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({userData}),
            }
          );
          if (!response.ok) {
            throw new Error("Signup failed:", response.statusText);
          }
          const data = await response.json();
          localStorage.setItem("token", data.access_token);
          setStore({ users: data.user });
          return data;
        } catch (error) {
          console.log("Signup error:", error);
          throw error;
        }
      },

      login: async (email, password) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({email, password}),
            }
          );
          if (!response.ok) {
            throw new Error("Login failed:", response.statusText);
          }
          const data = await response.json();
          localStorage.setItem("token", data.access_token);
          setStore({ user: data.user });
          return data;
        } catch (error) {
          console.log("Login error:", error);
          throw error;
        }
      },
      //GET ACTIONS://

      fetchUsers: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch users: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ users: data });
        } catch (error) {
          console.error("Fetch users error:", error);
        }
      },
      fetchCustomers: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/customers`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch customers: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ customers: data });
        } catch (error) {
          console.error("Fetch customers error:", error);
        }
      },
      fetchProviders: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/providers`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch providers: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ providers: data });
        } catch (error) {
          console.error("Fetch users error:", error);
        }
      },
      fetchEngineers: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/engineers`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch engineers: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ engineers: data });
        } catch (error) {
          console.error("Fetch engineers error:", error);
        }
      },
      fetchBranches: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/branches`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch branches: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ branches: data });
        } catch (error) {
          console.error("Fetch branches error:", error);
        }
      },
      fetchTickets: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/tickets`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch tickets: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ tickets: data });
        } catch (error) {
          console.error("Fetch tickets error:", error);
        }
      },

      fetchTicketsHistory: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/history_tickets`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to fetch tickets history: ${errorData.message}`
            );
          }
          const data = await response.json();
          setStore({ history_tickets: data });
        } catch (error) {
          console.error("Fetch tickets history error:", error);
        }
      },

      fetchInvoices: async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/invoices`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to fetch invoices: ${errorData.message}`);
          }
          const data = await response.json();
          setStore({ invoices: data });
        } catch (error) {
          console.error("Fetch invoices error:", error);
        }
      },

      //POST ACTIONS://

      createCustomer: async (customerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_customer`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({customerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create customer: ${errorData.message}`);
          }
          const newCustomer = await response.json();
          setStore((state) => ({ customers: [...state.customers, newCustomer] }));
          return newCustomer;
        } catch (error) {
          console.error("Create customer error:", error);
          throw error;
        }
      },

      createProvider: async (providerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_provider`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({providerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create provider: ${errorData.message}`);
          }
          const newProvider = await response.json();
          setStore((state) => ({
            providers: [...state.providers, newProvider],
          }));
          return newProvider;
        } catch (error) {
          console.error("Create provider error:", error);
          throw error;
        }
      },

      createEngineer: async (engineerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_engineer`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({engineerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create engineer: ${errorData.message}`);
          }
          const newEngineer = await response.json();
          setStore((state) => ({
            engineers: [...state.engineers, newEngineer],
          }));
          return newEngineer;
        } catch (error) {
          console.error("Create engineer error:", error);
          throw error;
        }
      },

      createBranch: async (branchData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_branch`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({branchData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create branch: ${errorData.message}`);
          }
          const newBranch = await response.json();
          setStore((state) => ({ branches: [...state.branches, newBranch] }));
          return newBranch;
        } catch (error) {
          console.error("Create branch error:", error);
          throw error;
        }
      },

      createUser: async (userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_user`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({userData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create user: ${errorData.message}`);
          }
          const newUser = await response.json();
          setStore((state) => ({ users: [...state.users, newUser] }));
          return newUser;
        } catch (error) {
          console.error("Create user error:", error);
          throw error;
        }
      },

      createTicket: async (ticketData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_ticket`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ticketData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create ticket: ${errorData.message}`);
          }
          const newTicket = await response.json();
          setStore((state) => ({ tickets: [...state.tickets, newTicket] }));
          return newTicket;
        } catch (error) {
          console.error("Create ticket error:", error);
          throw error;
        }
      },

      createTicketHistory: async (ticketHistoryData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_history_ticket`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ticketHistoryData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to create ticket history: ${errorData.message}`
            );
          }
          const newTicketHistory = await response.json();
          setStore((state) => ({
            history_tickets: [...state.history_tickets, newTicketHistory],
          }));
          return newTicketHistory;
        } catch (error) {
          console.error("Create ticket history error:", error);
          throw error;
        }
      },

      createInvoice: async (invoiceData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/new_invoice`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({invoiceData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create invoice: ${errorData.message}`);
          }
          const newInvoice = await response.json();
          setStore((state) => ({ invoices: [...state.invoices, newInvoice] }));
          return newInvoice;
        } catch (error) {
          console.error("Create invoice error:", error);
          throw error;
        }
      },

      //EDIT ACTIONS://

      updateCustomer: async (id, customerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/customers/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({customerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update customer: ${errorData.message}`);
          }
          const updatedCustomer = await response.json();
          setStore((state) => ({
            customers: state.customers.map((customer) =>
              customer.id === id ? updatedCustomer : customer
            ),
          }));
          return updatedCustomer;
        } catch (error) {
          console.error("Update customer error:", error);
          throw error;
        }
      },

      updateProvider: async (id, providerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/providers/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({providerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update provider: ${errorData.message}`);
          }
          const updatedProvider = await response.json();
          setStore((state) => ({
            providers: state.providers.map((provider) =>
              provider.id === id ? updatedProvider : provider
            ),
          }));
          return updatedProvider;
        } catch (error) {
          console.error("Update provider error:", error);
          throw error;
        }
      },

      updateEngineer: async (id, engineerData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/engineers/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({engineerData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update engineer: ${errorData.message}`);
          }
          const updatedEngineer = await response.json();
          setStore((state) => ({
            engineers: state.engineers.map((engineer) =>
              engineer.id === id ? updatedEngineer : engineer
            ),
          }));
          return updatedEngineer;
        } catch (error) {
          console.error("Update engineer error:", error);
          throw error;
        }
      },

      updateBranch: async (id, branchData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/branches/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({branchData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update branch: ${errorData.message}`);
          }
          const updatedBranch = await response.json();
          setStore((state) => ({
            branches: state.branches.map((branch) =>
              branch.id === id ? updatedBranch : branch
            ),
          }));
          return updatedBranch;
        } catch (error) {
          console.error("Update branch error:", error);
          throw error;
        }
      },

      updateUser: async (id, userData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({userData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update user: ${errorData.message}`);
          }
          const updatedUser = await response.json();
          setStore((state) => ({
            users: state.users.map((user) =>
              user.id === id ? updatedUser : user
            ),
          }));
          return updatedUser;
        } catch (error) {
          console.error("Update user error:", error);
          throw error;
        }
      },

      updateTicket: async (id, ticketData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/tickets/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ticketData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update ticket: ${errorData.message}`);
          }
          const updatedTicket = await response.json();
          setStore((state) => ({
            tickets: state.tickets.map((ticket) =>
              ticket.id === id ? updatedTicket : ticket
            ),
          }));
          return updatedTicket;
        } catch (error) {
          console.error("Update ticket error:", error);
          throw error;
        }
      },

      updateTicketHistory: async (id, ticketHistoryData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/history_tickets/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ticketHistoryData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to update ticket history: ${errorData.message}`
            );
          }
          const updatedTicketHistory = await response.json();
          setStore((state) => ({
            history_tickets: state.history_tickets.map((ticketHistory) =>
              ticketHistory.id === id ? updatedTicketHistory : ticketHistory
            ),
          }));
          return updatedTicketHistory;
        } catch (error) {
          console.error("Update ticket history error:", error);
          throw error;
        }
      },

      updateInvoice: async (id, invoiceData) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/invoices/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({invoiceData}),
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to update invoice: ${errorData.message}`);
          }
          const updatedInvoice = await response.json();
          setStore((state) => ({
            invoices: state.invoices.map((invoice) =>
              invoice.id === id ? updatedInvoice : invoice
            ),
          }));
          return updatedInvoice;
        } catch (error) {
          console.error("Update invoice error:", error);
          throw error;
        }
      },

      //DELETE ACTIONS://

      deleteCustomer: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/customers/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete customer: ${errorData.message}`);
          }
          setStore((state) => ({
            customers: state.customers.filter((customer) => customer.id !== id),
          }));
        } catch (error) {
          console.error("Delete customer error:", error);
          throw error;
        }
      },

      deleteProvider: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/providers/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete provider: ${errorData.message}`);
          }
          setStore((state) => ({
            providers: state.providers.filter((provider) => provider.id !== id),
          }));
        } catch (error) {
          console.error("Delete provider error:", error);
          throw error;
        }
      },

      deleteEngineer: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/engineers/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete engineer: ${errorData.message}`);
          }
          setStore((state) => ({
            engineers: state.engineers.filter((engineer) => engineer.id !== id),
          }));
        } catch (error) {
          console.error("Delete engineer error:", error);
          throw error;
        }
      },

      deleteBranch: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/branches/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete branch: ${errorData.message}`);
          }
          setStore((state) => ({
            branches: state.branches.filter((branch) => branch.id !== id),
          }));
        } catch (error) {
          console.error("Delete branch error:", error);
          throw error;
        }
      },

      deleteUser: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete user: ${errorData.message}`);
          }
          setStore((state) => ({
            users: state.users.filter((user) => user.id !== id),
          }));
        } catch (error) {
          console.error("Delete user error:", error);
          throw error;
        }
      },

      deleteTicket: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/tickets/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete ticket: ${errorData.message}`);
          }
          setStore((state) => ({
            tickets: state.tickets.filter((ticket) => ticket.id !== id),
          }));
        } catch (error) {
          console.error("Delete ticket error:", error);
          throw error;
        }
      },

      deleteTicketHistory: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/history_tickets/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              `Failed to delete ticket history: ${errorData.message}`
            );
          }
          setStore((state) => ({
            history_tickets: state.history_tickets.filter(
              (ticketHistory) => ticketHistory.id !== id
            ),
          }));
        } catch (error) {
          console.error("Delete ticket history error:", error);
          throw error;
        }
      },

      deleteInvoice: async (id) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/invoices/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete invoice: ${errorData.message}`);
          }
          setStore((state) => ({
            invoices: state.invoices.filter((invoice) => invoice.id !== id),
          }));
        } catch (error) {
          console.error("Delete invoice error:", error);
          throw error;
        }
      },
    },
  };
};

export default getState;
