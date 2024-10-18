package develup.infra.jpa;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Profile("dev")
public class DataSourceRouter extends AbstractRoutingDataSource {

    private final AtomicLong counter = new AtomicLong(0);

    @Override
    protected Object determineCurrentLookupKey() {
        boolean readOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (!readOnly) {
            return "write";
        }
        long count = counter.incrementAndGet();
        if (count % 2 == 0) {
            return "write";
        }
        return "read";
    }
}
