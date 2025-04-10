import { useGetQuoteQuery } from "../../../redux/features/quote/quoteApi";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Skeleton } from "../../ui/skeleton";

const QuoteOfToday = () => {
  const { data: quoteData, isLoading, isError } = useGetQuoteQuery(undefined);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-col items-center space-y-4 p-8">
          <Skeleton className="h-auto w-32 rounded-full" />
          <div className="space-y-3 w-full text-center">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !quoteData?.data) {
    return (
      <Card className="w-full border-destructive">
        <CardContent className="p-8 text-center text-destructive text-xl">
          Failed to load quote
        </CardContent>
      </Card>
    );
  }

  const { userImg, name, quote } = quoteData.data;

  return (
    <div className="px-4">
      <Card className="w-full shadow-md border border-gray-100">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="text-center">
            <h2 className="text-xl font-bold">Quote of the Day</h2>
            <p className="text-sm text-gray-500">Get inspired</p>
          </div>
          <Avatar className="h-20 w-20">
            <AvatarImage src={userImg} alt={name} className="object-cover" />
            <AvatarFallback className="text-4xl">
              {name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
        </CardHeader>
        <CardContent className="">
          <blockquote className="text-center">
            <p className=" leading-relaxed">"{quote}"</p>
          </blockquote>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteOfToday;
