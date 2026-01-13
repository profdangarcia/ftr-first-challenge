import { Link } from "lucide-react";

export function EmptyListWarning() {
 return (<div className="flex flex-col items-center justify-center py-12">
   <Link size={32} className="text-gray-400 mb-4" />
   <p className="text-xs text-gray-500 uppercase">
     Ainda não existem links cadastrados
   </p>
 </div>)
}
