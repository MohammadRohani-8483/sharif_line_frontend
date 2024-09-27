import styled from "styled-components";

export const QuestionnaireNotFound = () => {
    return <QuestionnaireNotFoundContainer>
        <p>پرسشنامه یافت نشد</p>
    </QuestionnaireNotFoundContainer>
}

const QuestionnaireNotFoundContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
`