import { useState } from "react";
import { useAddQuoteMutation } from "../../../redux/features/quote/quoteApi";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { toast } from "sonner";
import { Label } from "../../ui/label";

const AddQuote = () => {
  const [formData, setFormData] = useState({
    userImg: "",
    name: "",
    quote: "",
  });

  const [addQuote, { isLoading }] = useAddQuoteMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addQuote(formData).unwrap();
      toast.success("Quote added successfully!");
      setFormData({ userImg: "", name: "", quote: "" });
    } catch (error) {
      console.error("Failed to add quote:", error);
      toast.error("Failed to add quote. Please try again.");
    }
  };

  return (
    <div className="w-fullmx-auto py-4 px-4">
      <Card className="w-full border border-gray-100 shadow-lg">
        <CardHeader className="">
          <CardTitle className="text-xl font-bold text-center">
            Add New Inspiration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Image */}
            <div className="space-y-2">
              <Label htmlFor="userImg" className="text-lg">
                Profile Image URL
              </Label>
              <Input
                id="userImg"
                name="userImg"
                type="url"
                placeholder="https://example.com/profile.jpg"
                value={formData.userImg}
                onChange={handleChange}
                className="h-12 text-lg"
                required
              />
              {formData.userImg && (
                <div className="flex justify-center mt-2">
                  <img
                    src={formData.userImg}
                    alt="Preview"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">
                Author Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter the author's name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 text-lg"
                required
              />
            </div>

            {/* Quote */}
            <div className="space-y-2">
              <Label htmlFor="quote" className="text-lg">
                Inspirational Quote
              </Label>
              <Textarea
                id="quote"
                name="quote"
                placeholder="Enter the inspirational quote"
                value={formData.quote}
                onChange={handleChange}
                className="min-h-32 text-lg"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Adding Quote...
                </span>
              ) : (
                "Publish Inspiration"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddQuote;
