export interface tGsInhouse {
  room: string;
  roomtype: string;
  dateci: string | Date; // API bisa mengembalikan string ISO date
  dateco: string | Date; // API bisa mengembalikan string ISO date
  fullname: string;
}
