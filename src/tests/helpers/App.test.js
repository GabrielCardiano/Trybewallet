import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

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

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/digite sua senha/i);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });

    expect(loginBtn).toBeDisabled();

    userEvent.type(emailInput, 'tryber@trybe.com');
    userEvent.type(passwordInput, '123456');

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
  });
});
