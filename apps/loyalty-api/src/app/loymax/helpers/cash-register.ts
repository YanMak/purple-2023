import { ILoymaxCashRegister } from '../interfaces/cash-register.interface';

export const getCashRegisterData = (
  cashRegisters: ILoymaxCashRegister[],
  cash_register_id: string
) => {
  const regs = cashRegisters.filter(
    (el) => el.cashRegisterId === cash_register_id
  );
  if (regs.length) {
    return regs[0];
  }
  return undefined;
};
