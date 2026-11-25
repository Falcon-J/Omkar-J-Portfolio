// The existing API wraps Resend's { data, error } response inside { success, data }.
export function deliveryConfirmed(
  response: {
    success?: boolean;
    data?: { error?: unknown; data?: { id?: unknown } };
  } | null,
): boolean {
  return (
    response?.success === true &&
    !response.data?.error &&
    typeof response.data?.data?.id === "string" &&
    response.data.data.id.length > 0
  );
}
