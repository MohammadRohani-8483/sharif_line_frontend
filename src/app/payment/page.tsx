import Tooman from '@/src/components/common/Tooman'
import { PageCont, ParentImage } from '@/src/styles/common'
import { Icon } from '@/src/styles/common/icon'
import { PaymentBox } from '@/src/styles/pages/payment'
import { formatNumber } from '@/src/utils/functions/global'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  searchParams: {
    result: "success" | "failed",
    tc: string,
    amount: string
  }
}

export default function PaymentPage({ searchParams }: Props) {
  if ((searchParams.result !== 'success' && searchParams.result !== 'failed') ||
    (searchParams.result === 'success' && !searchParams.tc) ||
    !searchParams.amount)
    notFound()
  return (
    <PageCont>
      <Icon name='logo-answer' width={194} height={82} style={{ margin: '40px auto' }} />
      <PaymentBox>
        <ParentImage w={searchParams.result === 'success' ? 151.3 : 150} h={searchParams.result === 'success' ? 110 : 148.75} md_h={searchParams.result === 'success' ? 135 : 172.1} md_w={searchParams.result === 'success' ? 135 : 173.5}>
          <Image
            src={`/images/svg/payment-${searchParams.result}.svg`}
            alt='success'
            fill
          />
        </ParentImage>
        <h2 className='title'>
          {searchParams.result === 'success' ? 'پرداخت با موفقیت انجام شد' : 'پرداخت ناموفق بود'}
        </h2>
        {searchParams.result === 'failed' &&
          <p className="subtitle">
            در صورت کسر مبلغ از حساب شما حداکثر تا ۷۲ ساعت آینده به حساب شما باز خواهد گشت
          </p>
        }
        {searchParams.result === 'success' && <div className="item">
          <h4>کد پیگیری</h4>
          <h3>{searchParams.tc}</h3>
        </div>}
        <div className="item">
          <h4>مبلغ</h4>
          <div className="price">
            <h3>{formatNumber(+searchParams.amount || 0)}</h3>
            <Tooman color='#555555' type='square_bold' width={18} />
          </div>
        </div>
        <Link href='https://students.sharif.ir' style={{width:'100%'}}>
          <button>بازگشت به صفحه اصلی</button>
        </Link>
      </PaymentBox>
    </PageCont>
  )
}
