import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid"
import NepaliDate from "nepali-datetime"
import NepaliDatePicker from "../components/NepaliDatePicker"
import { np_nepaliMonths as nepaliMonths } from "../constants/mahina"
import nepaliNumber from "../helper/nepaliNumber"
import { type ChangeEvent, useState } from "react"
import useLanguage from "../helper/useLanguage"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Separator } from "../components/ui/separator"
import EnglishDatePicker from "../components/EnglishDatePicker"

const DateConverter = () => {
  const [date, setDate] = useState(new Date())
  const nepaliDate = new NepaliDate(date)
  const minDate = "1944-04-14"
  const maxDate = "2034-04-13"

  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {t("dc.Date_Converter")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-8">
              <div className="w-full space-y-2 flex flex-col items-center sm:w-auto sm:items-start">
                <label className="block text-sm font-medium text-foreground">
                  {t("dc.B.S")}
                </label>
                <NepaliDatePicker date={date} setDate={setDate} />
              </div>

              <div className="flex items-center justify-center w-full sm:w-auto">
                <ArrowsRightLeftIcon
                  className="h-6 w-6 rotate-90 text-muted-foreground sm:rotate-0"
                  aria-hidden="true"
                />
              </div>

              <div className="w-full space-y-2 flex flex-col items-center sm:w-auto sm:items-start">
                <label className="block text-sm font-medium text-foreground">
                  {t("dc.A.D")}
                </label>
                <EnglishDatePicker
                  date={date}
                  setDate={setDate}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 text-center">
              <p className="text-lg text-foreground">
                {`${nepaliNumber(`${nepaliDate.getYear()}`)} ${
                  nepaliMonths[nepaliDate.getMonth()]
                } ${nepaliNumber(
                  `${nepaliDate.getDate()}, ${nepaliDate
                    .getDateObject()
                    .toLocaleString("ne-NP", { weekday: "long" })}`
                )}`}
              </p>
              <p className="text-xl font-semibold text-foreground">
                {`${date.toLocaleString("default", {
                  weekday: "long",
                })} ${date.getDate()}, ${date.toLocaleString("default", {
                  month: "long",
                })} ${date.getFullYear()}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DateConverter
