import ErrorComp from "./ErrorComp";

export default function NotFound() {
  return <ErrorComp statusCode={404} message="چنین صفحه ای وجود ندارد." />;
}
