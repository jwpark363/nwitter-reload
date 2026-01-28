import { CircleCheck, CircleX, Megaphone, X } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";
import styled from "styled-components";

type ConfirmOptions = {
  title?: string;
  message?: string;
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: start;
`
const Dialog = styled.div`
  margin-top: 140px;
  background-color: gray;
  color: black;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1px;
`
const Title = styled.div`
  padding: 20px 0px;
  height: 32px;
  width: 100%;
  background-color: black;
  color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 560;
  border-radius: 12px 12px 0px 0px;
`
const Message = styled.div`
  padding: 24px 12px;
  background-color: lightgray;
  font-size: 16px;
  color: darkred;
  font-weight: 540;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 4px 0px;
  background-color: darkgray;
  border-radius: 0px 0px 12px 12px;
`
const Button = styled.div`
  cursor: pointer;
`

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = (options: ConfirmOptions) => {
    setOptions(options);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setOptions(null);
    resolver?.(result);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {options && (
        <Wrapper>
          <Dialog>
            <Title>
              <Megaphone size={24} />
              {options.title}
            </Title>
            <Message>{options.message}</Message>
            <ButtonWrapper>
              <Button>
                <CircleCheck onClick={() => handleClose(true)}/>
              </Button>
              <Button>
                <CircleX onClick={() => handleClose(false)} size={24}/>
              </Button>
            </ButtonWrapper>
          </Dialog>
        </Wrapper>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx.confirm;
};