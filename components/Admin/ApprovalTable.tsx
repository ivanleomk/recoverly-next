import ApprovalTableBody from "./ApprovalTableBody";
import GenericAdminTable from "./GenericAdminTable";
import useSWR from "swr";
import { fetcherWithBody } from "../../lib/swr";
import { getSellers } from "../../queries/getSellers";

const fields = ["Business", "UEN", "Address", "Contact Name", "Contact Email", "Stripe ID", "Verified", "Update"];

const AdminTable = () => {
  const { data, error } = useSWR(
    [
      "/api/graphql/getSellers",
      {
        query: getSellers,
      },
    ],
    fetcherWithBody
  );

  return (
    <div className="my-10">
      <GenericAdminTable fields={fields} title="Sellers">
        <>
          {data && data.seller &&
            <ApprovalTableBody sellers={
              data.seller.map(seller => ({
                ...seller,
                contact_name: seller.first_name + " " + seller.last_name,
                contact_email: seller.user.email,
              }))
            }
            />
          }
        </>
      </GenericAdminTable>
    </div>
  );
}

export default AdminTable
