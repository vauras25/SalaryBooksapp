// ViewPayslipScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Row = ({ left, right }) => (
  <View style={styles.row}>
    <Text style={styles.leftText}>{left}</Text>
    <Text style={styles.rightText}>{right}</Text>
  </View>
);

const ViewPayslipScreen = ({ route }) => {
  const { data } = route.params;
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const earningsList = [
    { label: "Gross", amount: parseFloat(data?.gross_earning) || "0.00" },
    { label: "Incentive", amount: parseFloat(data?.earnings_data?.bonus_total_amount) || "0.00" },
    { label: "Bonus", amount: parseFloat(data?.earnings_data?.bonus_total_amount) || "0.00" },
    { label: "Ex-gratia", amount: parseFloat(data?.earnings_data?.ex_gratia_total_amount) || "0.00" },
    { label: "OT", amount: parseFloat(data?.earnings_data?.ot_total_amount) || "0.00" },
    { label: "Arrear", amount: parseFloat(data?.earnings_data?.arrear_total_amount) || "0.00" },
    { label: "Leave Encashment", amount: parseFloat(data?.emp_data?.leave_encash_amount) || "0.00" },
    { label: "Shift Allowance", amount: parseFloat(data?.earnings_data?.shift_allowance_total_amount) || "0.00" },
    { label: "Extra Earnings", amount: parseFloat(data?.earnings_data?.extra_earnings_amount) || "0.00" },
    { label: "Sub Total", amount: parseFloat(data?.earnings_data?.sub_total) || "0.00" },
  ];


  const deductionsList = [
    { label: "EPF", amount: parseFloat(data?.emp_data?.earning_employee_pf_contribution) || "0.00" },
    { label: "VPF", amount: parseFloat(data?.emp_data?.earning_voluntary_pf_amount) || "0.00" },
    { label: "ESIC", amount: parseFloat(data?.emp_data?.earning_employee_esic_contribution) || "0.00" },
    { label: "P TAX", amount: parseFloat(data?.emp_data?.earning_pt_amount?.p_tax_amount) || "0.00" },
    { label: "LWF", amount: parseFloat(data?.deductions_data?.tds_amount) || "0.00" },
    { label: "TDS", amount: parseFloat(data?.emp_data?.deduction_tds) || "0.00" },
  ];


  const employerList = [
    { label: "EPF", amount: parseFloat(data.emp_data?.earning_employer_pf_contribution) || "0.00" },
    { label: "EPS", amount: parseFloat(data.emp_data?.earning_employer_eps_contribution) || "0.00" },
    { label: "Admin", amount: parseFloat(data.emp_data?.earning_employer_epf_admin_contribution) || "0.00" },
    { label: "EDLI", amount: parseFloat(data.emp_data?.earning_employer_edlis_contribution) || "0.00" },
    { label: "ESIC", amount: parseFloat(data.emp_data?.earning_employer_esic_contribution) || "0.00" },
    { label: "LWF", amount: parseFloat(data.contribution_data?.lwf_amount) || "0.00" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Pay Slip</Text>

        {/* ================= TOP TABLE ================= */}
        <View style={styles.table}>
          <Row left="Pay Slip Month" right={`${data.wage_month}/${data.wage_year}`} />
          <Row left="Employee Code" right={data.emp_id || "N/A"} />
          <Row left="Employee Name" right={data.emp_data.emp_first_name && data.emp_data.emp_last_name ? `${data.emp_data.emp_first_name} ${data.emp_data.emp_last_name}` : "N/A" || "N/A"} />
          <Row left="Client" right={data.emp_data?.client?.client_name || "N/A"} />
          <Row left="Branch" right={data.emp_data?.bank_details?.branch_name || "N/A"} />
          <Row left="Department" right={data.department?.department_name || "N/A"} />
          <Row left="HOD" right={data.emp_data.hod || "N/A"} />
          <Row left="Gender" right={data.emp_data?.sex || "N/A"} />
          <Row left="DOB" right={formatDate(data.emp_data.emp_emp_dob) || "NA"} />
          <Row left="DOJ" right={formatDate(data.emp_data?.date_of_join) || "N/A"} />
          <Row left="Email ID" right={data.emp_data?.emp_email_id || "N/A"} />
          <Row left="Phone" right={data.emp_data?.emp_mob || "N/A"} />
          <Row left="Bank Name" right={data.emp_data?.bank_details?.bank_name || "N/A"} />
          <Row left="Account Number" right={data.emp_data?.bank_details?.account_no || "N/A"} />
          <Row left="IFSC Code" right={data.emp_data?.bank_details?.ifsc_code || "N/A"} />
          <Row left="Account Type" right={data.emp_data?.bank_details?.account_type || "N/A"} />
          <Row left="Aadhar No" right={data.emp_data?.emp_aadhar_no || "N/A"} />
          <Row left="PAN No" right={data.emp_data?.emp_pan_no || "N/A"} />
          <Row left="UAN No" right={data.emp_data?.emp_uan_no || "N/A"} />
          <Row left="PF No" right={data.emp_data?.new_pf_no || "N/A"} />
          <Row left="ESIC IP No" right={data.emp_data?.esic_no || "N/A"} />
          <Row left="Month Days" right={data.month_days?.toString() || "N/A"} />
          <Row left="Week Off" right={data.emp_data?.attendance_summaries?.total_wo || "N/A"} />
          <Row left="Pay Days" right={data.emp_data?.attendance_summaries?.paydays || "N/A"} />
          <Row left="Paid Leave" right={data.emp_data?.attendance_summaries?.total_PDL || "N/A"} />
          <Row left="Holidays" right={data.emp_data?.attendance_summaries?.holiday || "N/A"} />
          <Row left="Present Days" right={data.emp_data?.attendance_summaries?.total_present || "N/A"} />
          <Row left="LOP Days" right={data.emp_data?.attendance_summaries?.total_lop || "N/A"} />
          <Row left="Arrear Period" right={data.arrear_period || "N/A"} />
        </View>

        {/* ================= SALARY BREAKUP TABLE ================= */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Salary Breakup</Text>

          {/* Earnings */}
          <View style={styles.headerRow}>
            <Text style={styles.blockTitle}>Earnings</Text>
            <Text style={styles.amountTitle}>Amount</Text>
          </View>
          {data.earnings.salary_report_heads.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.leftText}>{item.head_title}</Text>
              <Text style={styles.rightText}>{item.amount}</Text>
            </View>
          ))}
          {earningsList.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.leftText}>{item.label}</Text>
              <Text style={styles.rightText}>{item.amount}</Text>
            </View>
          ))}
        </View>
        {/* Deductions */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
          <Text style={styles.blockTitle}>Deductions</Text>
          <Text style={styles.amountTitle}>Amount</Text>
          </View>
          {deductionsList.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.leftText}>{item.label}</Text>
              <Text style={styles.rightText}>{item.amount}</Text>
            </View>
          ))}
        </View>
        {/* Employer Contribution */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
          <Text style={styles.blockTitle}>Employer Contribution</Text>
          <Text style={styles.amountTitle}>Amount</Text>
          </View>
          {employerList.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.leftText}>{item.label}</Text>
              <Text style={styles.rightText}>{item.amount}</Text>
            </View>
          ))}

        </View>
        {/* -------- TOTAL SUMMARY ROW -------- */}
        <View style={styles.summaryRow}>
          <Text style={styles.col}>Gross Earning: {data.emp_data?.earning_gross_earning || "0.00"}</Text>
          <Text style={styles.col}>Net Pay: {data.emp_data?.earning_net_take_home || "0.00"}</Text>
          <Text style={styles.col}>CTC: {data.emp_data?.earning_ctc || "0.00"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewPayslipScreen;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f2f4f8",
  },

  /* -------------------- PAGE TITLE -------------------- */
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 22,
    color: "#1e293b",
  },

  table: {
    marginBottom: 25,
  },

  /* -------------------- CARD SECTION (SALARY BREAKUP) -------------------- */
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 14,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    marginBottom: 24,
  },

  /* Section title "Salary Breakup" */
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 15,
    color: "#1e293b",
  },

  /* Block title like: Earnings, Deductions, Employer Contribution */
  blockTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    color: "#334155",
    borderBottomWidth: 1,
    borderColor: "#e8e8e8",
    paddingBottom: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 4,
  },

  blockTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  amountTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  /* Rows inside Salary breakup */
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ececec",
  },

  leftText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
    width: "60%",
  },

  rightText: {
    fontSize: 15,
    color: "#111",
    fontWeight: "700",
    textAlign: "right",
    width: "40%",
  },

  /* -------------------- TOTAL SUMMARY BAR -------------------- */
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#dbeafe",
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderRadius: 12,
    marginBottom: 32,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  col: {
    width: "33.33%",
    fontSize: 15,
    fontWeight: "800",
    color: "#1e40af",
  },
});


