import { Body, Buttons, Container, Footer, FootItem, HeadItem } from "@/src/styles/pages/questionnaire"
import { T_Mode } from "@/src/utils/types/global"
import styled from "styled-components"

const QuestionnaireSkeleton = ({ mode, isArchive }: { mode: T_Mode, isArchive?: boolean }) => {
  return (
    <Container isArchive={isArchive} mode={mode} skleton>
      <Body mode={mode}>
        <HeadItem mode={mode} isArchive={isArchive}>
          <div>
            <Item height={15} width={86} />
          </div>
          <Item height={24} width={150} />
        </HeadItem>
        <Footer mode={mode}>
          {!isArchive &&
            <FootItem mode={mode}>
              <Item height={20} width={100} />
            </FootItem>
          }
          <FootItem mode={mode}>
            <Item height={20} width={200} />
          </FootItem>
          <FootItem mode={mode}>
            <Item height={20} width={150} />
          </FootItem>
        </Footer>
      </Body>
      <Buttons mode={mode} skleton>
        {isArchive ?
          <section>
            <Item height={24} width={24} />
          </section>
          :
          <>
            <section>
              <Item height={24} width={24} />
            </section>
            <section>
              <Item height={24} width={24} />
            </section>
            <section>
              <Item height={24} width={24} />
            </section>
            <section>
              <Item height={24} width={24} />
            </section>
          </>
        }
      </Buttons>
    </Container>
  )
}

export default QuestionnaireSkeleton

const Item = styled.span<{ width: number, height: number }>`
  min-width: ${p => p.width}px;
  max-width: ${p => p.width}px;
  min-height: ${p => p.height}px;
  max-height: ${p => p.height}px;
  border-radius: 8px;
  background-color: ${p => p.theme.colors.neutral.e};
`