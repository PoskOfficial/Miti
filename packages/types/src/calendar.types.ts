export type Months =
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08"
  | "09"
  | "10"
  | "11"
  | "12"
export type CalendarData = Record<Months, DayData[]>
export interface DayData {
  year: string
  quarter: number
  month: string
  week: number
  week_day: number
  is_today: boolean
  day: string
  ad: string
  AD_date: ADDate
  events: Event[]
}

export interface ADDate {
  ad: string
  bs: string
  bs_day: number
  bs_month: number
  bs_year: number
  tithi: number
  ns_month: string
  ns_year: number
  chandrama: number
  is_verified: number
  remarks: ADDateRemarks
}

export enum ADDateRemarks {
  Empty = "",
  NPNCEdit1112 = "NP->NC edit 11 -> 12 ",
  NPNCEdit65 = "NP->NC edit 6 -> 5 ",
}

export interface Event {
  ad: string
  bs: string
  bs_day: number
  bs_month: number
  bs_year: number
  tithi: number
  ns_month: string
  ns_year: number
  chandrama: number
  is_verified: number
  remarks: ADDateRemarks
  updated_at: string
  event_index_id: number | null
  event_date: string | null
  ex_date: string | null
  id: null | string
  jpid: null
  jtl: null | string
  jds: JDS | null
  jsdt: string | null
  jed: string | null
  recurring_end_date: string | null
  jir: number | null
  has_reminder: number | null
  status: number | null
  duration: number | null
  rrule: null | string
  jci: null | string
  jbo: Jbo | null
  jlo: null | string
  jtp: Jtp | null
  priority: null | string
  verification_id: number | null
  event_verified_date: string | null
  verification_status: number | null
  verification_remarks: VerificationRemarksEnum | null
  exception_date: string | null
  new_date: string | null
  exception_status: number | null
  exception_remarks: null
  holiday_date: string | null
  holiday_type: null
  holiday_status: number | null
  gh: number
  jfr: Jfr
  jeddt: any[] | JeddtClass
  jevdt?: Jevdt
}

export enum Jbo {
  Ad = "AD",
  Bs = "BS",
  NS = "NS",
}

export interface JDS {
  jnid: string
  jct: Jct
  ne: string
  en: string
  jiu?: string
  jis?: string
  jbi: string
  jie: string
  jbd: Jbd
  gh: string
}

export enum Jbd {
  Empty = "",
  अन्तरास्ट्रियमातृभाषादिवस = "अन्तरास्ट्रिय मातृभाषा दिवस",
  घोडेजात्रा = "घोडेजात्रा",
  नेपालनर्सिङदिवस = "नेपाल नर्सिङ दिवस",
  भीमाएकादशीजयाएकादशीव्रत = "भीमा एकादशी | जया एकादशी व्रत",
  विश्वखेलदिवसविकासरशान्तिकालागिअन्तरास्ट्रियखेलदिवस = "विश्व खेल दिवस- विकास र शान्तिका लागि अन्तरास्ट्रिय खेल दिवस",
  विश्वपाईदिवस = "विश्व पाई दिवस ",
  विश्वमौसमदिवस = "विश्व मौसम दिवस",
  श्रीस्वस्थानीव्रतसमापन = "श्री स्वस्थानी व्रत- समापन",
  सोनामल्होसार = "सोनाम ल्होसार",
}

export enum Jct {
  Empty = "",
  International = "international",
  KtmValley = "ktm_valley",
  National = "national",
  Regional = "regional",
  Sports = "Sports",
}

export interface JeddtClass {
  event_id: string
  ex_date: string
  new_date: string
  status: number
  remarks: null
}

export interface Jevdt {
  event_id: string
  event_date: string
  status: number
  remarks: VerificationRemarksEnum
}

export enum VerificationRemarksEnum {
  ManuallyVerified = "(manually verified)",
  NPDateB000 = "NP date B000",
  NPDateB003 = "NP date B003",
  NPDateB004 = "NP date B004",
  NPExcepB001 = "NP Excep. B001",
  NPExceptionB004 = "NP Exception B004",
}

export interface Jfr {
  jfrri: number | string
  jfrm?: string
  jfrmd?: string
  jfrrt?: Jfrrt
  jfrrbdy?: string
  recurring_by_until?: string
  jfrrbu?: string
}

export enum Jfrrt {
  Monthly = "monthly",
  Yearly = "yearly",
}

export enum Jtp {
  Anniversary = "anniversary",
  Others = "others",
}

export type NewCalendarData = {
  calendarInfo: {
    dates: {
      bs: {
        year: {
          np: string | null
          en: string | null
        }
        month: {
          np: string | null
          code: {
            np: string | null
            en: string | null
          }
          en: string | null
        }
        day: {
          np: string | null
          en: string | null
        }
        full: {
          np: string | null
          en: string | null
        }
      }
      ad: {
        year: {
          np: string | null
          en: string | null
        }
        month: {
          np: string | null
          code: {
            np: string | null
            en: string | null
          }
          en: string | null
        }
        day: {
          np: string | null
          en: string | null
        }
        full: {
          np: string | null
          en: string | null
        }
      }
    }
    days: {
      dayOfWeek: {
        np: string | null
        en: string | null
      }
      codes: {
        np: string | null
        en: string | null
      }
    }
    nepaliEra: {
      sakSambat: {
        np: string | null
        en: string | null
      }
      nepalSambat: {
        year: {
          np: string | null
          en: string | null
        }
        month: {
          np: string | null
          code: {
            np: string | null
            en: string | null
          }
          en: string | null
        }
      }
    }
  }
  tithiDetails: TithiDetails
  panchangaDetails: PanchangaDetails
  hrituDetails: {
    id: string | null
    title: {
      np: string | null
      en: string | null
    }
    codes: {
      np: string | null
      en: string | null
    }
  } | null
  auspiciousMoments: {
    sahits: Array<{
      id: string | null
      title: {
        np: string | null
        en: string | null
      }
      description: {
        np: string | null
        en: string | null
      }
      times: {
        start: {
          np: string | null
          en: string | null
        }
        end: {
          np: string | null
          en: string | null
        }
      }
    }>
    muhurats: Array<{
      periodName: string | null
      duration: string | null
    }>
  }
  eventDetails: EventDetail[]
}

export type PanchangaDetails = {
  pakshya: {
    np: string | null
    en: string | null
  }
  chandraRashi: {
    time: {
      np: string | null
      en: string | null
    }
    endTime: {
      np: string | null
      en: string | null
    }
  }
  suryaRashi: {
    np: string | null
    en: string | null
  }
  nakshatra: {
    np: string | null
    endTime: {
      np: string | null
      en: string | null
    }
    ghaPa: {
      np: string | null
      en: string | null
    }
  }
  yog: {
    np: string | null
    en: string | null
    endTime: {
      np: string | null
      en: string | null
    }
  }
  karans: {
    first: {
      np: string | null
      endTime: {
        np: string | null
        en: string | null
      }
    }
    second: {
      np: string | null
      endTime: {
        np: string | null
        en: string | null
      }
    }
  }
  season: {
    name: {
      np: string | null
      en: string | null
    }
    code: {
      np: string | null
      en: string | null
    }
  }
  times: {
    sunrise: string | null
    sunset: string | null
    moonrise: string | null
    moonset: string | null
  }
} | null

export type TithiDetails = {
  title: {
    np: string | null
    en: string | null
  }
  code: {
    np: string | null
    en: string | null
  }
  endTime: {
    np: string | null
    en: string | null
  }
  display: {
    np: string | null
    en: string | null
  }
} | null

export type EventDetail = {
  id: string | null
  category: {
    name: string | null
    id: string | null
  }
  displayType: string | null
  title: {
    np: string | null
    en: string | null
  }
  isHoliday: boolean
  location: string | null
  timing: {
    from: string | null
    to: string | null
  }
  details: {
    en: string | null
    np: string | null
  }
}
