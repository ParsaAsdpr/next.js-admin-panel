import PN from "persian-number";
import moment from "jalali-moment";

const displayDate = (date: any) => {
  if (moment(date).isSame(moment(new Date(), "YYYY-MM-DD"), "day"))
    return PN.convertEnToPe(`امروز ساعت ${moment(date).locale("fa").format("HH:mm")}`);

  else if (
    moment(date).isSame(
      moment(new Date(), "YYYY-MM-DD").subtract(1, "day"),
      "day"
    )
  )
    return PN.convertEnToPe(`دیروز ساعت ${moment(date).subtract(1, "day").locale("fa").format("HH:mm")}`);

  const convertedDate = moment(date).locale("fa").format("jYYYY/jMM/jDD HH:mm");
  return PN.convertEnToPe(convertedDate);
};

export default displayDate;
