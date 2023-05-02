import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import Wallet from '../../pages/Wallet';

describe('Testa página de Login', () => {
  test('Testa se a página [/] renderiza  o componente de login', () => {
    renderWithRouterAndRedux(<App />);

    const loginText = screen.getByText(/login/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('Testa se botão "ENTRAR" é habilitado ao atender às condições necessárias e redireciona para a rota [/carteira]', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const testEmail = 'tryber@trybe.com';
    const testPassword = '123456';

    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeDisabled();

    const emailInput = screen.getByPlaceholderText(/email/i);
    userEvent.type(emailInput, testEmail);

    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    userEvent.type(passwordInput, testPassword);

    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);

    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Testa a página Wallet', () => {
  test('Testa se a página [/wallet] renderiza o componente Header', () => {
    const initialState = {
      user: {
        email: 'tryber@teste.com',
      },
    };

    renderWithRouterAndRedux(<Wallet />, { initialState });

    const loggedEmail = screen.getByTestId('email-field');
    const totalExpense = screen.getByText(/0\.00/i);
    const expenseCurrency = screen.getByText(/brl/i);

    expect(loggedEmail).toBeInTheDocument();
    expect(totalExpense).toBeInTheDocument();
    expect(expenseCurrency).toBeInTheDocument();
  });

  test('Testa se a página [/wallet] renderiza o cabeçalho da tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const description = screen.getByRole('columnheader', { name: /descrição/i });
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    const paymentMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const currency = screen.getByRole('columnheader', { name: 'Moeda' });
    const exchangeRate = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    const convertedValue = screen.getByRole('columnheader', { name: /valor convertido/i });
    const conversionCurrency = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    const editDelete = screen.getByRole('columnheader', { name: /editar\/excluir/i });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(paymentMethod).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(exchangeRate).toBeInTheDocument();
    expect(convertedValue).toBeInTheDocument();
    expect(conversionCurrency).toBeInTheDocument();
    expect(editDelete).toBeInTheDocument();
  });

  test('testa se preenchimento do formulário adiciona despesa à tabela', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const tagInput = screen.getByText(/categoria:/i);
    const valueInput = screen.getByText(/valor:/i);
    const descriptionInput = screen.getByText(/descrição:/i);
    await waitFor(() => {
      const currencyInput = screen.getByTestId('currency-input');
      expect(currencyInput).toBeInTheDocument();

      const firstOption = currencyInput.querySelector('option:first-of-type');
      expect(firstOption).toHaveValue('USD');
    });
    const paymentMethodInput = screen.getByText(/método de pagamento:/i);
    const addExpenseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(tagInput).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(paymentMethodInput).toBeInTheDocument();
    expect(addExpenseButton).toBeInTheDocument();

    userEvent.type(valueInput, 50);
    userEvent.type(descriptionInput, 'Pizza');

    userEvent.click(addExpenseButton);

    const descriptionCell = await screen.findByRole('cell', { name: /pizza/i });
    const tagCell = await screen.findByRole('cell', { name: /alimentação/i });
    // const valueCell = await screen.findByRole('cell', { name: /50\.00/i });
    const deleteButton = await screen.findByRole('button', { name: /excluir/i });

    expect(descriptionCell).toBeInTheDocument();
    expect(tagCell).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);

    await waitFor(() => {
      expect(descriptionCell).not.toBeInTheDocument();
      expect(tagCell).not.toBeInTheDocument();
      expect(deleteButton).not.toBeInTheDocument();
    });
  });
});
