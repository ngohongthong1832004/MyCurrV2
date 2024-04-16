import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Giảng viên",
    value: "213",
    footer: {
      color: "text-green-500",
      value: "+1",
      label: "Bắp Hồng Pine (CNTT) (2021-2022)",
    },
  },
  {
    color: "gray",
    icon: DocumentTextIcon,
    title: "Môn học",
    value: "1129",
    footer: {
      color: "text-green-500",
      value: "+9",
      label: "than last month",
    },
  },
  {
    color: "gray",
    icon: DocumentDuplicateIcon,
    title: "Đề cương",
    value: "18",
    footer: {
      color: "text-red-500",
      value: "-1",
      label: "last year",
    },
  },
];

export default statisticsCardsData;
