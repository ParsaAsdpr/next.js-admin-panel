import LineCharts from "../components/Dashboard/Charts/LineCharts";
import Button from "../components/common/Button";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout title='داشبورد' >
      <div className="grid grid-cols-3 gap-1 px-10">
        <div></div>

        <div className="col-span-2">
          <LineCharts />
        </div>
      </div>
      <Button type="default">Primary</Button>
    </Layout>
  );
}
