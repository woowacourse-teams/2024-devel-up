package develup.api.common;

public record PageResponse<T>(T data, int currentPage, int totalPage) {
}
