import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {

  const questions = [
    {
      id: 1,
      question: "خرید اقساتی به چه صورته؟",
      answer: "خیلی سادس" 
    },
    {
      id: 2,
      question: "ارسال رایگان دارید؟",
      answer: "بله برای سفارش های بالای ۲۰ میلیون تومان" 
    },
  ]

  return (
    <>
        <div className="flex flex-col items-center mb-10">
            <h3 className="font-bold text-2xl lg:text-3xl">📝 سوالات متداول</h3>
        </div>
        <div className="flex items-start justify-center bg-secondary rounded-lg p-2">
            <Accordion type="single" collapsible>
              {questions.map((q)=>(
                <AccordionItem key={q.id} dir="rtl" value={q.id}>
                    <AccordionTrigger className="text-base lg:text-lg font-semibold">{q.question}</AccordionTrigger>
                    <AccordionContent className="text-sm lg:text-base">
                        {q.answer}
                    </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
    </>
  )
}

export default FAQ